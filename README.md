## About this Project

This is the repository for [mcitcentral.com](www.mcitcentral.com), a site for the students of the MCIT Program at the University of Pennsylvania. We welcome feedback, suggestions and contributions from everyone from the student community.

This project uses the following technologies:

- React / Next.js
- Firebase
- Typescript
- Material UI

## Getting Started

First, install all dependencies.

```bash
npm ci
# or
yarn
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

## Environment

Please refer to the `.env.example` file the environment variables nececesary.

The environment variables prefixed with `NEXT_PUBLIC_FIREBASE` correspond with each of the keys in your firebase configuration.

In order to generate the Base64 string for `GOOGLE_APPLICATION_CREDENTIALS_BASE64` from a `service-key.json` file provided by Google, please run this in your console:

```bash
base64 service-key.json
```

## Acknowledgements

- This project is heavily inspired by [OMSCentral](https://omscentral.com/courses), which is also open source and maintained at [https://github.com/OMSCentral](https://github.com/OMSCentral).
