# Node.js Rate Limiting Example

This Node.js application demonstrates how to implement rate limiting using the `express-rate-limit` package in an Express application. The example includes two APIs: one with rate limiting applied and one without.

## What is Rate Limiting?

Rate limiting is a technique used to control the number of requests a user can make to an API within a given time period. It helps prevent abuse and ensures fair usage of resources.

## Features

- A basic Express server with two API endpoints.
- One endpoint is protected by rate limiting.
- The other endpoint has no rate limiting.

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rate-limiting-example.git
   cd express-rate-limiter

2. Run following commands to install packages and start server:
   ```bash
   npm install
   node server.js
   ```