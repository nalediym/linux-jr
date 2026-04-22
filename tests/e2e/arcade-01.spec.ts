import { test, expect } from '@playwright/test'

/**
 * Arcade Game #1 smoke test — Phase 4 verification (CTF arcade scaffolding).
 *
 * Goal: prove the new arcade screen and adapter glue actually work end-to-end.
 * Mirrors mission-01.spec.ts shape: clean slate, navigate, capture flag,
 * assert completion. If this passes the disclaimer→home→arcade-grid→playing
 * state machine is wired correctly and arcadeToMission() is doing its job.
 */

test.describe('Arcade #1: The First Door', () => {
  test('kid can capture the flag with cat readme', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    await expect(page.getByText('Linux Jr')).toBeVisible()
    await page.getByRole('button', { name: /let.s hack/i }).click()

    // Home screen — pick ARCADE
    await page.getByRole('button', { name: /^ARCADE/i }).click()

    // Arcade grid shows Game #1
    await expect(page.getByText('The First Door')).toBeVisible()
    await page.getByText('The First Door').click()

    // Terminal active; intro shows the summary
    await expect(page.getByText(/file in here/i)).toBeVisible({ timeout: 10000 })

    const input = page.getByRole('textbox')
    await input.click()

    await input.fill('cat readme')
    await input.press('Enter')

    await expect(page.getByText(/FLAG\{the_first_door\}/)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })

    // Persistence: arcadeCompleted is written, missionsCompleted untouched
    const progress = await page.evaluate(() => JSON.parse(localStorage.getItem('linuxjr-progress') || '{}'))
    expect(progress.arcadeCompleted).toContain('the-first-door')
    expect(progress.missionsCompleted || []).not.toContain('the-first-door')
  })
})
