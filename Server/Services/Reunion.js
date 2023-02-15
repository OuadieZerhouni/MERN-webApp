const Reunion=require("../Models/Reunion")

   exports.insert = async function (reunion) {
    return await Reunion.create(reunion);
}
   exports.getAll  = async function () {
    return await Reunion.find({});
}

   exports.getById  = async function (id) {
    return await Reunion.findById(id);
}
   exports.getByDate = async function (date) {
    return await Reunion.find({ Date: date });
}
   exports.AddLOJ = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $addToSet: { LOJ: value },
    });
}
   exports.RemoveLOJ = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $pull: { LOJ: value },
    });
}
   exports.AddProfPresent = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $addToSet: { prof_present: value },
    });
}
   exports.RemoveProfPresent = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $pull: { prof_present: value },
    });
}
   exports.AddProfAbsent = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $addToSet: { prof_absent: value },
    });
}
   exports.RemoveProfAbsent  = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $pull: { prof_absent: value },
    });
} 

   exports.getByDepartement = async function (id_departement) {
    return await Reunion.find({
        id_departement: id_departement,
    });
}
   exports.insert  = async function (reunion) {
    return await new Reunion(reunion).save();
}

   exports.update = async function (id, reunion) {
    return await Reunion.findByIdAndUpdate(id, reunion);
}

   exports.remove = async function (id) {
    return await Reunion.findByIdAndDelete(id);
}

/* PVs */
   exports.AddPV = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $addToSet: { PVs: value },
    });
}
   exports.RemovePV = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $pull: { PVs: value },
    });
}
   exports.UpdatePV  = async function (id, id_pv, value) {
    return await Reunion.updateOne(
        { _id: id, "PVs._id": id_pv },
        { $set: { "PVs.$": value } }
    );
}
//get comments by pv id
   exports.getCommentsByPV = async function (id_reunion, id_pv) {
    return await Reunion.find(
        { _id: id_reunion, "PVs._id": id_pv },
        { "PVs.$": 1 }
    );}
   exports.AddComment = async function (id_reunion, id_pv, value) {
    return await Reunion.updateOne(
        { _id: id_reunion, "PVs._id": id_pv },
        { $addToSet: { "PVs.$.comments": value } }
    );
}
   exports.RemoveComment = async function (id_reunion, id_pv,id_comment) {
    return await Reunion.updateOne(
        { _id: id_reunion, "PVs._id": id_pv },
        { $pull: { "PVs.$.comments": { _id: id_comment } } }
    );
}
   exports.UpdateComment = async function (id_reunion, id_pv, id_comment, value) {
    return await Reunion.updateOne(
        { _id: id_reunion, "PVs._id": id_pv, "PVs.comments._id": id_comment },
        { $set: { "PVs.$.comments.$": value } }
    );
}

