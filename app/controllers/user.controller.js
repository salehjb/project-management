// models
import UserModel from "../models/user.model.js";

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async editProfile(req, res, next) {
    try {
      const data = req.body;
      const userId = req.user._id
      // validation of inputs  
      Object.entries(data).forEach(([key, value]) => {
        if (!["first_name", "last_name", "email", "mobile", "skills"].includes(key)) throw { status: 400, message: "please enter a valid key" }
        if (!value) throw { status: 400, message: "please enter a valid value" }
      })
      // edit user profile
      const editUserprofile = await UserModel.updateOne({ _id: userId }, { $set: data })
      // edited or not
      if (editUserprofile.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "user profile edited successfully"  
        })
      } else {
        throw { status: 500, message: "error in user editing..." }
      }
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userId = req.user._id;
      // file path field
      const filePath = `${req.protocol}://${req.get("host")}/${req.file.path.substring(7).replace(/[\\\\]/, "/")}`
      // update profile_image field
      const profileImageUpdate = await UserModel.updateOne({ _id: userId }, { $set: { profile_image: filePath } })
      // updated or not
      if (profileImageUpdate.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "user profile image uploaded successfully"
        })
      } else {
        throw { status: 500, message: "user profile image uploaded failure" }
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllInviteRequests(req, res, next) {
    try {
      const userId = req.user._id;
      // get all invites
      const inviteRequests = await UserModel.find({ _id: userId }, { invite_requests: 1, _id: 0 });
      // there is a request or not
      if (inviteRequests.invite_requests === []) {
        res.status(200).json(...inviteRequests);
      } else {
        throw { status: 404, message: "you have not been invited by any team" };
      }
    } catch (error) {
      next(error);
    }
  }

  async changeRequestStatus(req, res, next) {
    try {
      const { id, status } = req.params;
      const request = await UserModel.findOne({ "invite_requests._id": id });
      if (!request) throw { status: 404, message: "a request with these specifications could not be found" };
      const findRequest = request.invite_requests.find(item => item.id == id);
      if (findRequest.status !== "pending") throw { status: 400, message: "this request has already been rejected or accepted" };
      if (!["accepted", "rejected"].includes(status)) throw { status: 400, message: "the submitted information is incorrect" }
      // change request status
      const updateRequestStatus = await UserModel.updateOne({ "invite_requests._id": id }, { $set: { "invite_requests.$.status": status } })
      // change status or not
      if (updateRequestStatus.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "your request status changed successfully"
        })
      } else {
        throw { status: 500, message: "your request change status failed" }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController;
