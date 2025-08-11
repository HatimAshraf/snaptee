import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field.length === 0)
  ) {
    throw new apiError(400, "All Fields are required");
  }
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new apiError(409, "User already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = re.files?.coverImage[0].path;
  if ([avatarLocalPath, coverImageLocalPath].some((field) => !field)) {
    throw new apiError(400, "All Fields are required");
  }
  const avatar = uploadOnCloudinary(avatarLocalPath);
  const coverImage = uploadOnCloudinary(coverImageLocalPath);
  if (!avatar || !coverImage) {
    throw new apiError(500, "Error while uploading images");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url,
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findbyId(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "User not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
