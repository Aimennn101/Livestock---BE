import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DoctorTimeslotRate from "../models/doctorTimeslotRate.mjs"

export const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: 'User already exists' });
    }
    else {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role
      });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email: email, role: role });
    if (!user) {
      return res.status(201).json({ message: 'Invalid credentials' });
    }
    const response = await bcrypt.compare(password, user?.password);

    if (!response) {
      return res.status(201).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, id: user._id }, role });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsersList = async (req, res) => {
  const { email, role } = req.params;
  try {
    const user = await User.findOne({ email: email, role: role }).select('-password');
    if (user) {
      res.status(200).json({ user });
    }
    else {
      res.status(201).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  const { phone, address1, address2, name, postcode, email, role, id } = req.body;
  try {
    const user = await User.findOne({ email: email, role: role });
    if (user) {
      const filter = { _id: user._id }; // E.g., search by _id
      const update = {
        $set: { name: name, address1: address1, address2: address2, postcode: postcode, phone: phone }  // Fields you want to update
      };
      const result = await User.updateOne(filter, update);
      if (result.matchedCount == 1) {
        res.status(200).json({ message: "Profile updated successfully", name: name, email: email, id: id, updated: 1 });
      }
      else {
        res.status(201).json({ message: "Error updating profile", updated: 0 });
      }
    }
    else {
      res.status(201).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePassword = async (req, res) => {
  const { email, password, confirmPassword, selectedRole } = req.body;
  try {
    if (password != confirmPassword) {
      res.status(201).json({ message: "Passwords don't match" });
    }
    const user = await User.findOne({ email: email, role: selectedRole })
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const filter = { _id: user._id };
      const update = {
        $set: { password: hashedPassword }
      };
      const result = await User.updateOne(filter, update);
      if (result.matchedCount == 1) {
        res.status(200).json({ message: "Password updated successfully", email: email, id: filter._id, updated: 1 });
      }
      else {
        res.status(201).json({ message: "Error updating password", updated: 0 });
      }
    }
    else {
      res.status(201).json({ message: "User does not exist" });
    }
  }
  catch {
    res.status(201).json({ message: "Error updating password" });
  }
}

// export const getAllUsers = async (req, res) => {
//   const { role } = req.params;
//   try {
//     const user = await User.find({role: role}).select("name email created_at phone");
//     if(user) {
//       res.status(200).json({user});
//     }
//     else {
//       res.status(201).json({message: "Data does not exist"});
//     }
//   } catch (error) {
//     console.error('Error during fetching:', error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


export const getAllUsers = async (req, res) => {
  const { role } = req.params;
  try {
    const users = await User.find({ role: role }).select("name email created_at phone");
    if (users && users.length > 0) {
      if (role == 'user') {
        let usersWithBookingCount = await Promise.all(users.map(async (user) => {

          const booked = await DoctorTimeslotRate.countDocuments({ booked_by: user._id });
          return {
            ...user.toObject(),
            booked,
          };
        }));
        res.status(200).json({ usersWithBookingCount });
      }
      else res.status(200).json({ users })
    } else {
      res.status(201).json({ message: "Data does not exist" });
    }
  } catch (error) {
    console.error('Error during fetching:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const getAllUsersCountByRoles = async (req, res) => {
  try {
    const rolesCount = await User.aggregate([
      {
        $match: { role: { $in: ["admin", "user", "doctor"] } }
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    if (rolesCount.length > 0) {
      res.status(200).json({ rolesCount });
    } else {
      res.status(201).json({ message: "No data found for the specified roles" });
    }
  } catch (error) {
    console.error('Error during fetching:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};