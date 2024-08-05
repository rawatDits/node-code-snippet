# Node.js Clustering Example

This is a simple Node.js application demonstrating the use of clustering to improve performance by utilizing multiple CPU cores. The application uses the `express` framework to create a basic web server with a single API endpoint.

## What is Clustering?

Clustering in Node.js allows you to create multiple instances of a Node.js server to take advantage of multi-core systems. By distributing the workload across multiple processes, you can improve the performance and scalability of your application.

In a clustered environment:
- The **master** process manages the worker processes.
- Each **worker** process runs a copy of your Node.js application and can handle requests independently.
- The master process ensures that the worker processes are automatically restarted if they fail.

## Features

- Demonstrates the use of Node.js clustering.
- Provides a single API endpoint to respond with a simple message.

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rawatDits/node-code-snippet.git
   cd node-clustering
