import ScrapedData from "../model/scrapeModel";

export const scrape = async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');
    const logo = $('meta[property="og:image"]').attr('content');
    const screenshot = $('meta[property="og:screenshot"]').attr('content');
    const facebook = $('a[href*="facebook.com"]').attr('href');
    const twitter = $('a[href*="twitter.com"]').attr('href');
    const linkedin = $('a[href*="linkedin.com"]').attr('href');
    const instagram = $('a[href*="instagram.com"]').attr('href');
    const address = $('address').text() || null;
    const phone = $('a[href^="tel:"]').text() || null;
    const email = $('a[href^="mailto:"]').text() || null;

    const newData = new ScrapedData({
        url,
        name,
        description,
        logo,
        screenshot,
        facebook,
        twitter,
        linkedin,
        instagram,
        address,
        phone,
        email,
    });

    // Save the document to MongoDB
    const savedData = await newData.save();

    if (savedData) {
        res.send({
          status: true,
          message: "Document Added",
          result: savedData,
        });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape data or save to database' });
}
};


export const getScrapeDetails =  async (req, res) => {
  try {
      const companies = await Company.find();
      res.json(companies);
  } catch (error) {
      console.error('Failed to fetch companies', error);
      res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

export const getScrapeDetailsById = async (req, res) => {
  try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if (!company) {
          return res.status(404).json({ message: 'Company not found' });
      }
      res.json(company);
  } catch (error) {
      console.error('Error fetching company:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteScrapeDetailById = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedCompany = await Company.findByIdAndDelete(id);
      if (!deletedCompany) {
          return res.status(404).json({ error: 'Company not found' });
      }
      res.json({ message: 'Company deleted successfully' });
  } catch (error) {
      console.error('Failed to delete company', error);
      res.status(500).json({ error: 'Failed to delete company' });
  }
};


export const allScapeDelete = async (req, res) => {
  try {
      await Company.deleteMany({}); // Delete all documents in the Company collection
      res.json({ message: 'All companies deleted successfully' });
  } catch (error) {
      console.error('Error deleting companies:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};



