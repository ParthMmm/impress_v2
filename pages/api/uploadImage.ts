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

  const fileName = uuid();
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: `posts/${fileName}.jpg`,
    ContentType: 'image/jpeg',
    // Body: req.body.file,
    ACL: 'public-read',
    // Body:
    Expires: 60,
  };
  //   const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  //   console.log(uploadURL);
  //   res.status(200).json({ uploadURL });
  const post = await s3.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Fields: {
      key: `posts/${fileName}.jpg`,
      ContentType: 'image/jpeg',
    },
    Expires: 60,
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 1 MB
    ],
  });
  console.log(post);
  res.status(200).send(post);

  //   res.status(200).json(post);

  //   try {
  //     s3.getSignedUrl('putObject', s3Params, async (err, data) => {
  //       if (err) {
  //         res.json({ success: false, error: err });
  //       }
  //       console.log('🔢', data);
  //       const returnData = {
  //         signedRequest: data,
  //         url: `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/posts/${fileName}`,
  //       };
  //       //   const imageUrl = await prisma.user.update({
  //       //     where: {
  //       //       email: session.user.email,
  //       //     },
  //       //     data: {
  //       //       business: {
  //       //         update: {
  //       //           businessLogo: returnData.url,
  //       //         },
  //       //       },
  //       //     },
  //       //   });
  //       console.log('🧟‍♂️', returnData);
  //       res.status(200).json(returnData);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  //   return;
}
