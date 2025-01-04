import express from "express"
import { getByCategory, getDetails, getSimilar, getTrailers, getTrendingMovie } from "../controller/movie.controller.js"

const router = express.Router()

router.get("/trending",getTrendingMovie)
router.get("/:id/trailers",getTrailers)
router.get("/:id/details",getDetails)
router.get("/:id/similar",getSimilar)
router.get("/:category",getByCategory)

export default router