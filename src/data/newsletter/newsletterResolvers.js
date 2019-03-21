export default {
	Mutation: {
		addToNewsletter: async (obj, args, context) => {
			const newsletters = context.db.models.newsletters;
			const emailInput = args.email;

			await newsletters.findOrCreate({ where: { email: emailInput } });

			const subCount = await newsletters.count();
			const numberToText = `${subCount}${subCount > 1 ? 'ème' : 'er'}`;
			const answer = `${emailInput} a bien été ajouté à nos newsletters !\n Vous êtes le ${numberToText} :)`;
			console.log(answer);

			return answer;
		},
	},
};
