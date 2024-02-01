module.exports = {
  async headers() {
    return [
      {
        // Enable CORS for all routes
        source: '/api/:path*',  // Adjust the path as needed
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          // Add other necessary headers as needed
        ],
      },
    ];
  },
};