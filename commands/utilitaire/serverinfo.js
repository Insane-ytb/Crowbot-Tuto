const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');
const axios = require('axios')

module.exports = {
	name: 'serverinfo',
	aliases: ['si'],
	run: async (client, message, args, prefix, color) => {

		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true) {
			
			const guild = client.guilds.cache.get(args[0]) || message.guild

			let boosters = message.guild.members.cache.filter(m => m.premiumSince)?.map(function(m) {return `<@${m.id}> Boost Depuis : <t:${parseInt(m.premiumSinceTimestamp / 1000)}:f>`}).join("\n");
			if(!boosters || boosters.length < 1) boosters = "__Personne n'est en train de booster le serveur__";

			const verificationLevels = {
				NONE: '0',
				LOW: 'Faible',
				MEDIUM: 'Moyen',
				HIGH: 'Élevé',
				VERY_HIGH: 'Très élevé',
			};

			let NoRoles = 0;
			guild.members.cache.forEach((m) => {
				if (m.roles.cache.size == 0) i++;
			})
			//console.log(NoRoles)
			const ServerInfo = new Discord.MessageEmbed()
				.setTitle(`${guild.name} `)
				.setURL("https://discord.gg/RM9HKMbpS8")
				.addField(`Identifiant Serveur <a:warningbug:1264660318357815385> :`, `__${guild.id}__`, true)
				.addField(`Niveau De Vérification :`, `__${verificationLevels[message.guild.verificationLevel]}__`, true)
				.addField(`Nombre De Membre(s) <:membres:1264636824152707073> :`, `__${guild.memberCount}__`, true)
				.addField(`Nombre De Membre(s) Actif(s) <:enligne:1264636879362457660> :`, `__${guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'streaming' || m.presence?.status === 'idle').size}__`, true)
				.addField(`Nombre D'humain(s) <:membres:1264636824152707073> :`, `__${guild.members.cache.filter((m) => !m.user.bot).size}__`, true)
				.addField(`Nombre De Bot(s) :robot: :`, `__${guild.members.cache.filter((m) => m.user.bot).size}__`, true)
				.addField(`Nombre D'utilisateur(s) En Vocal <:vocal:1264637104026157056> :`, `__${guild.members.cache.filter(m => m.voice.channel).size}__`, true)
				.addField(`Nombre D'utilisateur(s) Sans Rôle :x: :`, `__${NoRoles}__`, true)
				.addField(`Nombre De Boost(s) <a:boost:1264636030116565035> :`, `__${guild.premiumSubscriptionCount}__`, true)
				//.addField(`Nombre De Booster(s) <a:boost:1264636030116565035> :`, `${boosters}`, true)
				.addField(`Nombre De Rôle(s) :scroll: :`, `__${guild.roles.cache.size}__`, true)
				.addField(`Nombre De Salon(s) <a:salon:1264662855131594885> :`, `__${guild.channels.cache.size}__`, true)
				.addField(`Nombre D'émoji(s) Total :package: :`, `__${guild.emojis.cache.size}__`, true)
				.setImage(message.guild.bannerURL({size: 1024}))
				.setFooter("La Création Du Serveur Remonte au :")
				.setTimestamp(guild.createdAt)

				.setThumbnail(guild.iconURL({
					dynamic: true
				}))
				.setColor(color)

			if (guild.icon) ServerInfo.setURL(guild.iconURL({
				dynamic: true
			}))

			message.channel.send(ServerInfo)
		}
	}
}
