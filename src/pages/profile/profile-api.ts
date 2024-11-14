import { BASE_URL, BaseAPI, HTTPTransport } from "../../services";
import { TEditPassPayload, TEditProfilePayload } from "./profile-types";

const profileApiInstance = new HTTPTransport(BASE_URL);

export class ProfileAPI extends BaseAPI {
  delete() {
    return profileApiInstance.post("/auth/logout");
  }

  request() {
    return profileApiInstance.get("/auth/user");
  }

  editPass(editPassPayload: TEditPassPayload) {
    return profileApiInstance.put("/user/password", { data: editPassPayload });
  }

  editProfile(editProfilePayload: TEditProfilePayload) {
    return profileApiInstance.put("/user/profile", {
      data: editProfilePayload,
    });
  }

  editAvatar(editProfilePayload: FormData) {
    return profileApiInstance.put("/user/profile/avatar", {
      data: editProfilePayload,
    });
  }
}
