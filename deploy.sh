#!/bin/bash

# Define your bucket name and CloudFront distribution ID
BUCKET_NAME="buzzle.life"
DISTRIBUTION_ID="E21BHKFJSFVX3X"

# Build the React app
echo "Building the React app..."
npm run build

# Sync build files to S3
echo "Uploading files to S3..."
aws s3 sync build/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
