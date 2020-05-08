import * as aws from 'aws-sdk';

const client = new aws.SecretsManager({ region: 'us-east-1' });

export const getSecret = (secretName): Promise<string> =>
  new Promise<string>((resolve, reject) =>
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      // TODO: handle error gracefully.
      if (err) reject(err);
      if (!('SecretString' in data)) reject('Could not get secret from Secret Manager.');
      resolve(data.SecretString);
    })
  );
