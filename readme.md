# xAPI Statements

Fork from https://github.com/learninglocker/xapi-statements.

We make the following changes to deploy xapi-statements individually:

1. Support deploy without redis.

    We use kinesis to ingest statements so we don't need redis. As the project already has a FakeEventsRepo for testing purpose, we just change the repoFacade to enable the FakeEventsRepo on production.

2. Add base url prefix "/data" to align with xapi-service.

    This change is to ensure the endpoints dont' change if we would need a full-function xapi-service in the future.

3. Change the dockerfile to use node:8-alpine as base image.

    We would try use alpine as base image if possible.

## Development

A custom branch is created for this customize version. Ideally, once a new version is released, the changes should be merged in the custom branch and tag with the version number.

## Sync updates from up-stream

Basically just create pull request from upstream.

Details TBD.

## Merge new version

1. Create a new branch for the new version source code (use v5.0.1 as example).

```sh
git checkout tags/v5.0.1 -b v5.0.1
```

2. Merge the new updates to the custom branch.

```sh
git checkout custom
git merge v5.0.1
```

3. Add tag in custom branch

```sh
git tag c5.0.1
```

4. Push

```sh
git push origin custom:custom
```

5. Delete temp branches

```sh
git branch -d v5.0.1
```
