const { TeamModel } = require('./../models/team/team-model');

const teamsIncomplete = async (user) => {
  try {
    //query a los teams incompletos. populate array de devs
    const Teams = await TeamModel.find({ isComplete: 'false' })
      .populate({
        path: 'devs',
        select: 'role -_id',
      })
      .exec();

    if (Teams.length > 0) {
      //copio los resultados de la query en un array
      const teamsData = [...Teams];

      let idTeam = '';

      //extraigo propiedades del array en constantes
      for (let i = 0; i < teamsData.length; i++) {
        const roleDev = teamsData[i].devs;

        //compruebo si existe un dev con el rol del registrado
        const devRole = roleDev.some((x) => x.role == user.role);

        if (!devRole) {
          idTeam = teamsData[i]._id;
          break;
        }
      }

      //comprobacion que no haya ningun team incompleto que necesite el rol del dev registrado
      if (idTeam !== '') {
        //agregar a team
        const Team = await TeamModel.findByIdAndUpdate(
          { _id: idTeam },
          { $push: { devs: user._id } },
          { runValidators: true, returnDocument: 'after' }
        ).exec();

        if (Team.devs.length === 4) {
          Team.isComplete = true;
        }

        await Team.save();

        console.log(`dev created and assigned`);
        return Team._id;
      } else {
        //create team
        const newTeam = new TeamModel({
          devs: [user._id],
          language: user.info.language,
          stack: user.info.stack,
          //isComplete,
          time_zone: user.info.time_zone,
          //working,
          availability: user.info.time_availability,
        });

        await newTeam.save();

        console.log(`new team ${newTeam._id} created. roles assigned`);
        return newTeam._id;
      }
    } else {
      console.log('all teams complete');

      //create team
      const newTeam = new TeamModel({
        devs: [user._id],
        language: user.info.language,
        stack: user.info.language,
        //isComplete,
        time_zone: user.info.time_zone,
        //working,
        availability: user.info.time_availability,
      });

      await newTeam.save();

      console.log(`team ${newTeam._id} created`);
      return newTeam._id;
    }
  } catch (error) {
    console.log(`teamsIncomplete`);
  }
};

module.exports = teamsIncomplete;
