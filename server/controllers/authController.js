import User from "../models/User.js";

// Get or create user from Clerk webhook
export const handleClerkWebhook = async (req, res) => {
  try {
    const { data } = req.body;

    if (req.body.type === "user.created" || req.body.type === "user.updated") {
      const { id, email_addresses, first_name, last_name } = data;

      let user = await User.findOne({ clerkId: id });

      if (user) {
        // Update existing user
        user.email = email_addresses[0].email_address;
        user.firstName = first_name;
        user.lastName = last_name;
        await user.save();
      } else {
        // Create new user
        user = new User({
          clerkId: id,
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
        });
        await user.save();
      }

      return res.status(200).json({ success: true, user });
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.clerkId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { phone, address, notificationPreferences, reminderDays } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId: req.user.clerkId },
      {
        phone,
        address,
        notificationPreferences,
        reminderDays,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};