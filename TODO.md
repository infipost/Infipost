# Navigation + active-state fix TODO

- [x] Update `entropyos.html` navbar to include Home link and order: Home | EntropyOS | Binary
- [x] Update `binary.html` navbar to include Home link and order: Home | EntropyOS | Binary
- [x] Update `main.js` navigation logic to:


  - [ ] Always default to Home on initial load of `index.html`
  - [ ] Highlight EntropyOS/Binary based on `location.hash` on `index.html`
  - [ ] Highlight EntropyOS on `entropyos.html` and Binary on `binary.html`
  - [ ] Ensure only one `.nav-link-item.active` at a time
  - [ ] Listen to `hashchange`/`popstate` for correct updates
  - [ ] Call update on `DOMContentLoaded` and again on `load`
- [ ] Manual verification on `index.html`, `entropyos.html`, `binary.html`

