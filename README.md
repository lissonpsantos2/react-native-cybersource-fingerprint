# react-native-cybersource-fingerprint

Plugin to use with the cybersource fingerprint

## Installation

```sh
npm install react-native-cybersource-fingerprint
```

## Usage

You will need to get from your vendor an orgId and the serverUrl. And create a unique sessionId on each app startup:

```js
import { config, startProfiling } from 'react-native-cybersource-fingerprint';

// ...

const orgId = 'as9da77';
const serverUrl = 'h.online-metrix.net';
const sessionId = '0436aa32-ee74-11ed-a05b-0242ac120003';

// ...

const configResponse = await config(orgId, serverUrl);
const profilingResponse = await startProfiling(`MERCHANT_ID${sessionId}`);
```

The profiling response type is:
```ts
{
  success: boolean;
  statusCode: number;
  sessionId: string;
  statusDescription: string;
}
```

Based on the success property you can take actions about the profiling process.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
