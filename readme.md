# Get started

A cli to conveniently commit using the conventionalcommits.org specification 

### Installation
```
npm i -g @lioloc/commit
```

### Usage

```
commit
```

Then follow prompts to complete your commit message.

### Advanced Usage

Based on the conventionalcommits specification, a type, scope and message composes your commit message. 

Consider the following commit message:

> "feat(cart): Added remove item button"

1. `type` = feat
2. `scope` = cart
3. `message` = Added remove item button

With that in mind, the following flags are available:

| Command | Description |
| ------------- | ------------- |
| `-t`| Confirms you wish to add a type |
| `-s` | Confirms you wish to add a scope (this will be ignored if --no-type flag is added) |
| `-p` | Confirms you wish to push to origin branch |
| `--no-type` | Confirms you don't wish to add a type |
| `--no-scope` | Confirms you don't wish to add a scope (this will be ignored if no type is entered) |
| `--no-push` | Confirms you don't wish to push to origin branch |
