# Hack The Box — Starting Point

> **Source:** [kb/raw/ctf-beginner/htb-starting-point.md](../../raw/ctf-beginner/htb-starting-point.md)
> **Original URL:** https://www.hackthebox.com/starting-point (HTTP 500 at fetch; reconstructed from public docs)
> **Ingested:** 2026-04-22
> **Hash:** cd3cbe02abfae33b1bec24477ce5ac35eca61fc94594f8b97a9ec215eb8fe61a
> **Status:** unverified (URL returned 500; content reconstructed)
> **Chunks:** 4

## Chunks

### c-cd3cbe02: Tier structure
> Starting Point has Tier 0 (Meow, Fawn, Dancing, Redeemer — free), Tier 1 (Explosion, Preignition, Mongod, Synced — free), Tier 2 (paid).

### c-cd3cbe03: Tier 0 lessons
> Mostly default-credential / legacy-protocol enumeration: telnet, ftp anonymous, SMB, redis-cli.

### c-cd3cbe04: Flag format
> HTB{some_flag_value}.

### c-cd3cbe05: Arcade fit
> Tier 0 mechanics (network protocol enumeration) are out of scope. We inherit visual convention (terminal aesthetic, FLAG{} format) and difficulty progression naming.

## Related Concepts

- [flag-format](../concepts/flag-format.md)

<!-- human notes below -->

## Verification debt

The hackthebox.com/starting-point page returned HTTP 500 at the time of ingest.
Tier names and box names are well-known public knowledge but should be re-verified
when the page is reachable. The actual *mechanics* of Tier 0 boxes are not used
by the arcade; only the flag-format convention is inherited.
