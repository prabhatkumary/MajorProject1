const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) =>{
  
let listing = await Listing.findById(req.params.id.trim());
let newReview = new Review(req.body.review);
newReview.author = req.user._id;
listing.reviews.push(newReview);

await newReview.save();
await listing.save();
req.flash("success", "new Review  Created!");
res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req, res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id.trim(), {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId.trim());
req.flash("success", "Review  Deleted!");
    res.redirect(`/listings/${id}`);
  };