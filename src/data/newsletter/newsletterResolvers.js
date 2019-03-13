export default {
	Mutation: {
		addToNewsletter: async (obj, args, context) => {
			const newsletters = context.db.models.newsletters;
			const emailInput = args.email;

			await newsletters.findOrCreate({ where: { email: emailInput } });

			const numberOfSubscribers = await newsletters.count();
			const answer = `${emailInput} a bien été ajouté à nos newsletters !\n Vous êtes le ${numberOfSubscribers}ème :)`;
			console.log(answer);

			return answer;
		},
	},
};
