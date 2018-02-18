# aws-kms-thingy

Convenience wrapper around the AWS Node.js SDK to simplify encrypting/decrypting secrets with the AWS KMS service. Suitable for use with AWS Lambda.

[![CircleCI](https://img.shields.io/circleci/project/github/adieuadieu/aws-kms-thingy/master.svg?style=flat-square)](https://circleci.com/gh/adieuadieu/aws-kms-thingy)
[![GitHub release](https://img.shields.io/github/release/adieuadieu/aws-kms-thingy.svg?style=flat-square)](https://github.com/adieuadieu/aws-kms-thingy)

## Contents

1. [Features](#features)
1. [Usage](#usage)
   1. [With AWS Lambda](#with-aws-lambda)
   1. [With Multiple Secrets](#with-multiple-secrets)
   1. [With the CLI](#with-the-cli)
1. [Related Thingies](#related-thingies)
1. [License](#license)

### Features

* unencrypted strings simply returned, useful for testing/local development
* encrypt/decrypt multiple values in one go
* results are cached, so multiple decrypt/encrypt calls incur only a single call to the AWS SDK

## Usage

The module assumes that the Amazon SDK has access to AWS credentials that are able to access the KMS key used for encryption and decryption.

### With AWS Lambda

Safe to use within a Lambda handler. After cold-start, decrypted values are cached so subsequent invocations won't incur an AWS KMS API call:

```javascript
const { kmsDecrypt } = require('aws-kms-thingy')

module.exports.myLambdaHandler = (event, context, callback) => {
  kmsDecrypt(process.env.SOME_API_TOKEN) // Only incurs network call on cold-start
    .then(doStuffWithDecryptedApiToken)
    .then(resultOrWhatever => callback(null, resultOrWhatever))
    .catch(callback)
}
```

### With Multiple Secrets

Decrypt multiple values in parallel

```javascript
const { kmsDecrypt } = require('aws-kms-thingy')

const [decryptedApiToken1, decryptedApiToken2, somethingElseSecret] = await kmsDecrypt([
  process.env.API_TOKEN_1,
  process.env.API_TOKEN_2,
  process.env.SOMETHING_ELSE_SECRET,
])
```

### With the CLI

Encrypt with:

```bash
aws-kms-thingy encrypt
```

You'll be prompted for the string to encrypt.

Decrypt with:

```bash
aws-kms-thingy decrypt
```

You'll be prompted for the encrypted string to decrypt

## Related Thingies

* [aws-s3-thingy](https://github.com/adieuadieu/aws-s3-thingy)
* [alagarr](https://github.com/adieuadieu/alagarr) — AWS Lambda/API Gateway Request/Response Thingy
* [aws-kms-crypt](https://github.com/sjakthol/aws-kms-crypt)

## License

**aws-kms-thingy** © [Marco Lüthy](https://github.com/adieuadieu), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Marco Lüthy with help from contributors ([list](https://github.com/adieuadieu/aws-kms-thingy/contributors)).

> [github.com/adieuadieu](https://github.com/adieuadieu) · GitHub [@adieuadieu](https://github.com/adieuadieu) · Twitter [@adieuadieu](https://twitter.com/adieuadieu)
