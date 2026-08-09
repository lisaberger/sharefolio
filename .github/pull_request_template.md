### Changes description (technical view)

<!-- Explain technical details of the changes in this MR to help reviewers understand your work. -->

- .

### **WIP**: Open Todos

<!--
Add/Explain open tasks that block this MR from being merged.
Remove this whole section if empty.
-->

- [ ] .

### Steps to manual test

<!-- Explain which path in the ui has to be taken to see the changes in this MR -->

-


### Impact of this merge request

- [ ] Dependencies changed (needs `b5 ui:pnpm install --frozen-lockfile`)
- [ ] Recommendation: Update setup (`b5 update`)

### Notes

<!--
Any further helpful comments?
**Example**: "You need to run a `b5 install` before testing or go crazy while figuring it out by yourself!"
-->

- .

### Changelog (enduser facing)

<!--
Explain with one or more bulletpoints what this MR changed for the enduser.
This info might later be included in the CHANGELOG.md.
-->

- .

### Checklist ***[Mandatory]***

- [ ] Acceptance criteria of JIRA ticket are fulfilled
- [ ] MR title starts with Jira-ID (e.g. `XX-nnnn: <descriptive title>`)
- [ ] Changelog section is filled out (or removed/empty if MR is not relevant for changelog)
- [ ] Self review of this MR has been made
- [ ] Implementation hat been refactored to be cleaner
- [ ] Linting shows no issues (checked `b5 ui:lint`)
- [ ] Existing tests still pass (checked `b5 ui:test:unit`)
- [ ] Existing e2e test still pass (checked `b5 ui:test:e2e`)
- [ ] New tests for the changes exist and pass

### Checklist ***[Optional]***

- [ ] If necessary: Technical documentation in git is added / updated
- [ ] If necessary: Documentation in Confluence is added / updated
- [ ] If necessary: Accessibility features were considered

### Accessibility ***[Optional]***

- [ ] **alt-tag**: All images were checked for the "alt" tag
- [ ] **semantic**: HTML structure is semantic
- [ ] **color**: The contrast between foreground and background colors is enough (e.g. 4.5/3 for AA)
- [ ] **keyboard** operation: All elements can be accessed via "tab" and the order makes sense
- [ ] **form**: All form fields have a description or a label
- [ ] **heading** structure: The headings start with an h1 and a higher number is not under a lower number
- [ ] **links & buttons**: Right purpose and meaningful description for links and buttons
- [ ] **table**: Information from tables also clearly structured for screen readers and downloadable
- [ ] **icons**: The visual content of icons is also accessible to those who cannot see
- [ ] **moving content**: Any moving content is stoppable


### Review by

- @NotYourself

/assign_reviewer @NotYourself
/assign me
/label ~UI
