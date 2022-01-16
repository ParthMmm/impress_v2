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

  //   const fileName = uuid();
  let fileName;
  const fileType = req.body.fileType;

  //   const re = /[^.]*$/;
  const re = /\.(.*)/;
  //   const re = new RegExp('[^/]*$');
  let x = re.exec(req.body.fileName);
  if (x) {
    console.log('🚀', x[0]);
    fileName = uuid() + x[0];
  }

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: `posts/${fileName}`,
    ContentType: 'image/jpeg',
    // Body: req.body.file,
    ACL: 'public-read',
    // Body:
    Expires: 60,
  };

  console.log(fileName);

  //   const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  //   console.log(uploadURL);
  //   res.status(200).json({ uploadURL });
  const post = await s3.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Fields: {
      key: `posts/${fileName}`,
      ContentType: fileType,
    },
    Expires: 60,
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 1 MB
    ],
  });
  console.log(post);
  let link = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/posts/${fileName}`;

  res.status(200).send({ post, link });

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
