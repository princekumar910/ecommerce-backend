const aws = require('aws-sdk')
const s3Client = new aws.S3(
);
const uploadImageToS3 = async (imageBuffer, key) => {
    // imageBuffer refer to the base64 come from frontend but for backend we are passing directly link
    // key = shopId/itemId  which is unique
    const params = {
        Bucket: process.env.Bucket_Name,
        Key: key,
        Body: imageBuffer,
        ContentType: 'image/jpeg'
    };
    try {
        const response = await s3Client.upload(params).promise();
        return response.Location;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
};

module.exports = uploadImageToS3;