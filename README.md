# Debountify

## Introduction

Debountify is a cutting-edge application that seamlessly integrates UI, blockchain, and backend technologies. Our platform leverages the power of Next.js for a smooth user experience, Solana blockchain for secure and decentralized operations, and efficient backend processing to create a robust, full-stack solution.

## Features

- 🎨 Sleek, intuitive user interface built with Next.js and Tailwind CSS
- 🔗 Secure, decentralized data storage powered by Solana Blockchain
- 🚀 High-performance backend processing using Next.js and RESTful APIs
- 🔒 Enhanced security through advanced cryptographic measures
- 📝 Smart contract development support via Rust and Anchor Framework
- 🔄 Seamless integration between UI, Blockchain, and Backend modules

## Tech Stack

### Frontend
- Next.js v14
- Tailwind CSS
- shadcn/ui
- JavaScript

### Blockchain
- Solana Blockchain
- Rust
- Anchor Framework

### Backend
- Next.js v14
- RESTful API
- Solana/Web3 Library

## Prerequisites

Ensure you have the following installed:
- Node.js and npm
- Rust and Anchor
- Basic understanding of blockchain technology

## Installation

1. Clone the repository
   ```sh
   git clone https://github.com/DeBountify/debountify-app.git
   ```
   
   ```sh
   cd debountify-app
   ```

2. Navigate to the project directory

3. Install dependencies
   ```sh
   npm install 
   ```

## Configuration
1. Create a .env or add in 'next.config.js' file in the root directory and add necessary environment variables.
```dosini
    SOLANA_URL=https://api.devnet.solana.com
    DEPLOYED_PROGRAM_ADDRESS=solana_deployed_address
    PINATA_JWT=pinata_jwt
    PINATA_VIEW_API=https://ipfs.io/ipfs/
```

2. Configure your Solana wallet for testing on devnet.

## Usage
1. Start the development server
2. Open your browser and navigate to http://localhost:3000
3. Connect your Solana wallet to interact with the application.

## Development
- The pages directory contains the main application routes.
- The components directory houses reusable React components.
- Solana program code is located in the programs directory.
- Use the Anchor Framework for developing and testing Solana programs.

## Contributing
We welcome contributions to the DeBountify project. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [Solana](https://solana.com/)
- [Anchor Framework](https://project-serum.github.io/anchor/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)