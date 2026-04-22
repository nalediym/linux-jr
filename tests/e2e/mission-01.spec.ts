import { test, expect } from '@playwright/test'

/**
 * Mission 01 smoke test — Phase 3 verification.
 *
 * One test. Goal: detect structural regressions in under 60 seconds.
 * Does NOT aim for comprehensive coverage. Does aim to fail loudly
 * when something fundamental breaks (welcome screen missing,
 * mission select broken, terminal not accepting input, FLAG check
 * broken).
 *
 * If this passes, the minimum viable game loop works. Anything
 * richer needs manual QA on iPad Safari.
 */

test.describe('Mission 01: The Missing Blueprint', () => {
  test('kid can complete M1 end-to-end', async ({ page }) => {
    // Clean slate — no previous localStorage
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    // Welcome screen
    await expect(page.getByText('Linux Jr')).toBeVisible()
    await page.getByRole('button', { name: /let.s hack/i }).click()

    // Mission select — click The Missing Blueprint
    await expect(page.getByText('The Missing Blueprint')).toBeVisible()
    await page.getByText('The Missing Blueprint').click()

    // Terminal should be active. Wait for the mission intro text.
    await expect(page.getByText(/Captain Rex/i)).toBeVisible({ timeout: 10000 })

    // Find the input bar and type commands.
    // The terminal has a custom input field; find by role=textbox.
    const input = page.getByRole('textbox')
    await input.click()

    const sendCommand = async (cmd: string) => {
      await input.fill(cmd)
      await input.press('Enter')
    }

    await sendCommand('pwd')
    await sendCommand('ls')
    await sendCommand('cd workshop')
    await sendCommand('ls')
    await sendCommand('cd secret-room')
    await sendCommand('ls')
    await sendCommand('cat .hidden-blueprint.txt')

    // FLAG appears → mission complete
    await expect(page.getByText(/FLAG\{you_found_it_hacker\}/)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/MISSION COMPLETE/i)).toBeVisible({ timeout: 5000 })
  })
})
