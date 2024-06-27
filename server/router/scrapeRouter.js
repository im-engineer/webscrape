import express from "express";
const router = express.Router();
import { document } from "../middleware/Upload";
import { allScapeDelete, deleteScrapeDetailById, getScrapeDetails, getScrapeDetailsById, scrape } from "../controller/scrapeController";

router.post("/addScrapeDetails",document.fields([{ name: "logo", maxCount: 1 },{screenshot:"screenshot", maxCount:1}]),scrape);
router.get("/getScrapeDetails",getScrapeDetails);
router.get("/getScrapeDetailsById/:id",getScrapeDetailsById)
router.delete("/deleteScrapeDetailById/:id",deleteScrapeDetailById);
router.delete("/allScapeDelete",allScapeDelete)

export default router;
