const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ngrokFree, ngrokGmail } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ngrok')
		.setDescription('Give ngrok adress'),
	async execute(interaction) {
		const reponseNgrokFree = await fetch('https://api.ngrok.com/endpoints', {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': 'Bearer ' + ngrokFree,
				'Ngrok-Version': '2',
			},
		}).then(response => response.json()).catch(error => console.log(error));

        const reponseNgrokGmail = await fetch('https://api.ngrok.com/endpoints', {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + ngrokGmail,
                'Ngrok-Version': '2',
            },
        }).then(response => response.json()).catch(error => console.log(error));

        const hostFree = [];
        for (let i = 0; i < reponseNgrokFree.endpoints.length; i++) {
            hostFree.push(reponseNgrokFree.endpoints[i].hostport);
        }
        const hostGmail = [];
        for (let i = 0; i < reponseNgrokGmail.endpoints.length; i++) {
            hostGmail.push(reponseNgrokGmail.endpoints[i].hostport);
        }
        /* for (let i = 0; i < host.Compiegne.length; i++) {
            fields.set({ name: 'Compiegne', value: host.Compiegne[i], inline: true })
        }

        for (let i = 0; i < host.Maubeuge.length; i++) {
            fields.set({ name: 'Maubeuge' + i, value: host.Maubeuge[i], inline: true })
        }
        */
        const embed = new EmbedBuilder()
            .setTitle('Ngrok')
            .setColor('#0099ff')
            .addFields(
                { name: 'Compiègne :', value: hostFree.join("\n"), inline: false },
                { name: 'Maubeuge :', value: hostGmail.join("\n"), inline: false },
            )
        await interaction.reply({ embeds: [embed] });
	},
};