const Member = require("../models/Member");

async function getMembers(req, res, next) {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    return res.json(members);
  } catch (error) {
    return next(error);
  }
}

async function getMember(req, res, next) {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found." });
    }

    return res.json(member);
  } catch (error) {
    return next(error);
  }
}

async function createMember(req, res, next) {
  try {
    const member = await Member.create(req.body);
    return res.status(201).json(member);
  } catch (error) {
    return next(error);
  }
}

async function updateMember(req, res, next) {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found." });
    }

    return res.json(member);
  } catch (error) {
    return next(error);
  }
}

async function deleteMember(req, res, next) {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found." });
    }

    return res.json({ message: "Member deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
};
