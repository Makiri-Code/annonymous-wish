const { generateResponse } = require("../services/gemin-ai");
const { catchAsync } = require("../utils/catch-async");
const {
  createWish,
  getAllWishes,
  updateWishes,
} = require("../model/wishes.model");
const AppError = require("../utils/app-error");

const httpPostWishes = catchAsync(async (req, res, next) => {
  const wish = req.body?.wish;
  if (!wish) {
    return next(new AppError("Please provide a wish for me", 400));
  }
  const response = await generateResponse(wish);

  const data = await createWish({ wish, response });

  return res.status(200).json({
    success: true,
    data,
  });
});

const httpUpdatetWishes = catchAsync(async (req, res, next) => {
  const id = req.params?.id;
  const emoji = req.body?.reactions;
  if (!emoji) {
    return next(new AppError("Please provide an emoji", 400));
  }

  const data = await updateWishes(id, emoji);

  return res.status(200).json({
    success: true,
    data,
  });
});

const httpGetWishes = catchAsync(async (req, res, next) => {
  const data = await getAllWishes(req.query);
  return res.status(200).json({
    success: true,
    data,
  });
});

module.exports = { httpPostWishes, httpGetWishes, httpUpdatetWishes };
