import { NextApiRequest, NextApiResponse } from 'next';
import aws from 'aws-sdk';
import { uuid } from 'uuidv4';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  aws.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
  });
  const s3 = new aws.S3();

  let fileName;
  const fileType = req.body.fileType;

  const re = /\.(.*)/;
  let trimmedType = re.exec(req.body.fileName);

  if (trimmedType) {
    console.log('🚀', trimmedType[0]);
    fileName = uuid() + trimmedType[0];
  }

  try {
    const post = s3.createPresignedPost({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Fields: {
        key: `posts/${fileName}`,
        ContentType: fileType,
      },
      Expires: 60,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
      ],
    });

    const link = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/posts/${fileName}`;

    res.status(200).send({ post, link });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
