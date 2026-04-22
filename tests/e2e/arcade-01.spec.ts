import { test, expect } from '@playwright/test'

/**
 * Arcade smoke tests — Phase 4.
 *
 * Goals:
 *  - Prove the disclaimer → home → arcade-grid → playing loop is wired.
 *  - Cover at least one game per new mechanic so a regression in the
 *    parser/FS extensions fails loudly.
 *  - Exercise the post-capture feedback panel (rating + text + persistence).
 *
 * Each test starts from a clean localStorage so they don't interfere.
 */

async function startArcade(page) {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await expect(page.getByText('Linux Jr')).toBeVisible()
  await page.getByRole('button', { name: /let.s hack/i }).click()
  await page.getByRole('button', { name: /^ARCADE/i }).click()
}

test.describe('Arcade #1: The First Door', () => {
  test('captures flag with cat readme + writes arcadeCompleted', async ({ page }) => {
    await startArcade(page)
    await page.getByText('The First Door').click()
    await expect(page.getByText(/Capture the flag/i).first()).toBeVisible({ timeout: 10000 })

    const input = page.getByRole('textbox')
    await input.click()
    await input.fill('cat readme')
    await input.press('Enter')

    await expect(page.getByText(/FLAG\{the_first_door\}/)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })

    const progress = await page.evaluate(() => JSON.parse(localStorage.getItem('linuxjr-progress') || '{}'))
    expect(progress.arcadeCompleted).toContain('the-first-door')
    expect(progress.missionsCompleted || []).not.toContain('the-first-door')
  })
})

test.describe('Arcade #4: Dot Files (hidesDotfiles + ls -a)', () => {
  test('plain ls hides .secret; ls -a reveals it; cat .secret captures flag', async ({ page }) => {
    await startArcade(page)
    await page.getByText('Dot Files').click()
    await expect(page.getByText(/Capture the flag/i).first()).toBeVisible({ timeout: 10000 })

    const input = page.getByRole('textbox')
    await input.click()

    // Plain ls should NOT show .secret
    await input.fill('ls')
    await input.press('Enter')
    // Wait briefly for the line to render then check both expectations
    await expect(page.getByText(/^readme\s+notes\s*$|^notes\s+readme\s*$/m).first()).toBeVisible({ timeout: 5000 })

    // ls -a reveals .secret
    await input.fill('ls -a')
    await input.press('Enter')
    await expect(page.getByText('.secret', { exact: false }).first()).toBeVisible({ timeout: 5000 })

    // cat .secret captures the flag
    await input.fill('cat .secret')
    await input.press('Enter')
    await expect(page.getByText(/FLAG\{dotfiles_revealed\}/)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Arcade #7: grep the Flag', () => {
  test('grep PATTERN FILE returns matching line and captures flag', async ({ page }) => {
    await startArcade(page)
    await page.getByText('grep the Flag').click()
    await expect(page.getByText(/Capture the flag/i).first()).toBeVisible({ timeout: 10000 })

    const input = page.getByRole('textbox')
    await input.click()
    await input.fill('grep FLAG data.txt')
    await input.press('Enter')

    await expect(page.getByText(/FLAG\{found_in_the_haystack\}/)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Arcade #8: Decode Me (base64 -d)', () => {
  test('base64 -d encoded captures flag', async ({ page }) => {
    await startArcade(page)
    await page.getByText('Decode Me').click()
    await expect(page.getByText(/Capture the flag/i).first()).toBeVisible({ timeout: 10000 })

    const input = page.getByRole('textbox')
    await input.click()
    await input.fill('base64 -d encoded')
    await input.press('Enter')

    await expect(page.getByText(/FLAG\{base64_no_secret\}/)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Arcade feedback panel', () => {
  test('emoji rating + text submit persists to localStorage and routes back', async ({ page }) => {
    await startArcade(page)
    await page.getByText('The First Door').click()

    const input = page.getByRole('textbox')
    await input.click()
    await input.fill('cat readme')
    await input.press('Enter')

    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })
    // Feedback panel renders; pick a rating
    const panel = page.getByTestId('arcade-feedback')
    await expect(panel).toBeVisible({ timeout: 5000 })
    await panel.getByRole('button', { name: /rate awesome/i }).click()
    // Text input appears after rating
    const textarea = panel.locator('textarea')
    await textarea.fill('this rocked')
    await panel.getByRole('button', { name: /Send & back to Arcade/i }).click()

    // Routed back to arcade grid
    await expect(page.getByText(/^Arcade$/)).toBeVisible({ timeout: 5000 })

    // Feedback persisted
    const feedback = await page.evaluate(() => JSON.parse(localStorage.getItem('linuxjr-feedback') || '[]'))
    expect(feedback).toHaveLength(1)
    expect(feedback[0]).toMatchObject({
      gameId: 'the-first-door',
      rating: 3,
      text: 'this rocked',
    })
  })

  test('skip without rating writes nothing and still routes back', async ({ page }) => {
    await startArcade(page)
    await page.getByText('The First Door').click()
    const input = page.getByRole('textbox')
    await input.click()
    await input.fill('cat readme')
    await input.press('Enter')

    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })
    const panel = page.getByTestId('arcade-feedback')
    await expect(panel).toBeVisible({ timeout: 5000 })
    await panel.getByRole('button', { name: /skip — back to Arcade/i }).click()

    await expect(page.getByText(/^Arcade$/)).toBeVisible({ timeout: 5000 })
    const feedback = await page.evaluate(() => JSON.parse(localStorage.getItem('linuxjr-feedback') || '[]'))
    expect(feedback).toHaveLength(0)
  })
})
