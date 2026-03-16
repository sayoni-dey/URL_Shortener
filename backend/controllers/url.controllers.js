import { encodeBase62 } from '../utils/encoder.js';
import { getNextSequence } from '../utils/nextSequence.js';
import {Url} from '../models/urlSchema.js';

export const createShortUrl = async (req, res) => {
    try{
    const {originalUrl} = req.body;

    if(!originalUrl){
        return res.status(404).json({message: "URL required"});
    }

    //URL validation
    let parsedUrl;
    try{
      parsedUrl = new URL(originalUrl);
    }catch(err){
      return res.status(400).json({message: "Invalid URL format"});
    }

    if(!["https:", "http:"].includes(parsedUrl.protocol)){
      return res.status(400).json({message : "Only http:/https: links allowed"});
    }

    //Checks if url exists or not if exists then the url is given existing shortcode
    const existing = await Url.findOne({originalUrl});
    if(existing){
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`
      });
    }

    const seq = await getNextSequence();
    const shortCode = await encodeBase62(seq);

    const newUrl = await Url.create({
        originalUrl,
        shortCode
    });
    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      data: newUrl,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );


    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if(url.expiresAt && url.expiresAt < new Date()){
      return res.status(404).json({message : " link expired!!! "});
    }
    
    return res.redirect(url.originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};