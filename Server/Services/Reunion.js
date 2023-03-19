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
exports.getPV=async(id_reunion)=>{
    const reunion= await this.getById(id_reunion);
    return reunion.PV;
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
    exports.removeByDepartement = async function (id_departement) {
    return await Reunion.deleteMany({ id_departement: id_departement });
}
    exports.removeProf=async(id_prof)=>{
    return await Reunion.updateMany(
        { prof_present: id_prof },
        { $pull: { prof_present: id_prof } }
    );
}


/* PV */
   exports.AddPV = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $addToSet: { PV: value },
    });
}
   exports.RemovePV = async function (id, value) {
    return await Reunion.findByIdAndUpdate(id, {
        $pull: { PV: value },
    });
}
   exports.UpdatePV  = async function (id, id_pv, value) {
    return await Reunion.updateOne(
        { _id: id, "PV._id": id_pv },
        { $set: { "PV.$": value } }
    );
}
exports.getCommentsByReunion = async function (id_reunion) {
    const _reunion =await Reunion.findOne(
        { _id: id_reunion }
    );
    return _reunion.PV.comments
}

exports.AddComment = async function (id_reunion, value) {
    return await Reunion.updateOne(
        { _id: id_reunion },
        { $addToSet: { "PV.comments": value } }
    );
}

exports.RemoveComment = async function (id_reunion, id_comment) {
    return await Reunion.updateOne(
        { _id: id_reunion },
        { $pull: { "PV.comments": { _id: id_comment } } }
    );
}

exports.UpdateComment = async function (id_reunion, id_comment, value) {
    return await Reunion.updateOne(
        { _id: id_reunion, "PV.comments._id": id_comment },
        { $set: { "PV.comments.$": value } }
    );
}

