import TattooModel from "../models/Tattoo.js";

export const getOne = async (req, res) => {
  try {
    const tattooId = req.params.id;
    const tattoo = await TattooModel.findById(tattooId);

    if (!tattoo) {
      return res.status(404).json({ message: "tattoo не найдено" });
    }

    res.json(tattoo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось получить tattoo" });
  }
};

export const getAll = async (req, res) => {
  try {
    const tattoos = await TattooModel.find().populate("user").exec();

    res.json(tattoos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось получить список tattoo" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TattooModel({
      desc: req.body.desc,
      part: req.body.part,
      imgUrl: req.body.imgUrl,
      user: req.userId,
    });

    const tattoo = await doc.save();
    res.json(tattoo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось добавить tattoo" });
  }
};

// FIXME: remove
export const remove = async (req, res) => {
  try {
    const tattooId = req.params.id;
    await TattooModel.findOneAndDelete(
      {
        _id: tattooId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Не удалось удалить tattoo ..." });
        }

        if (!doc) {
          return res.status(404).json({ message: "tattoo не найдено" });
        }

        res.json({ success: true });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось получить tattoo" });
  }
};

export const update = async (req, res) => {
  try {
    const tattooId = req.params.id;
    await TattooModel.updateOne(
      {
        _id: tattooId,
      },
      {
        desc: req.body.desc,
        part: req.body.part,
        imgUrl: req.body.imgUrl,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось обновить tattoo" });
  }
};
