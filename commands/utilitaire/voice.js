const Discord = require('discord.js')
const db = require('quick.db')
const {
    MessageActionRow,
    MessageButton,
    MessageMenuOption,
    MessageMenu
} = require('discord-buttons');

module.exports = {
    name: 'voice',
    aliases: ['vc', 'stats', 'stat'],

    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
            if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                const guild = client.guilds.cache.get(args[0]) || message.guild

        if (args[0] === "all") {

            var streamingCount = 0;
            var mutedCount = 0;
            var mutedMic = 0;
            var cameraCount = 0;
            var connectedCount = 0;

            const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
            channels.forEach(c => {
                connectedCount += c.members.size;
                c.members.forEach(m => {
                    if (m.voice.streaming) streamingCount++;
                    if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                    if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                    if (m.voice.selfVideo) cameraCount++;
                })
            })
            const voiceConnectedEmbed = new Discord.MessageEmbed()
                .setTitle(`__${message.guild.name} ➔ Statistiques__`)
                .setURL('https://github.com/4wip')
                //.setThumbnail(guild.iconURL({dynamic: true}))
                .setDescription(`
- ${message.guild.memberCount > 1 ? '*Membres*' : '*Membre*'} *sur le serveur :* **${message.guild.memberCount}** <:membres:1264636824152707073>
- ${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size > 1 ? '*Membres*' : '*Membre*'} *en ligne :* **${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}** <a:4_terre:1220445710223151217>
- ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Membres*' : '*Membre*'} *en vocal :* **${message.guild.members.cache.filter(m => m.voice.channel).size}** <:vocal:1264637104026157056>
- ${message.guild.premiumSubscriptionCount > 1 ? '*Nombre*' : '*Nombres*'} *de boosts :* **${message.guild.premiumSubscriptionCount}** <a:4_boost:1217008346662699098>
`)
                .setColor(color)
                .setTimestamp()
                .setFooter(`${message.guild.name} #Statistiques`)

                if (guild.icon) voiceConnectedEmbed.setThumbnail(guild.iconURL({
                    dynamic: true
                }))

            return message.channel.send(voiceConnectedEmbed)
        } else if (!args[1]) {
            let embed = new Discord.MessageEmbed()
                .setTimestamp()
				.setTitle(`__${message.guild.name} ➔ Statistiques Salon Vocaux__`)
				.setURL('https://github.com/4wip')
				.setThumbnail(guild.iconURL({dynamic: true}))
                .setDescription(`- *Il y a actuellement* **${message.guild.members.cache.filter(m => m.voice.channel).size} ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? 'Personnes' : 'Personne'}** *en vocal sur le serveur.* <:vocal:1264637104026157056>`)
                .setColor(color)
                .setFooter(`${message.guild.name} #Statistiques`)

            message.channel.send(embed)

        } else if (!args[0] || args[0] === "info") {
            if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                if (args[1] === "all") {

                    var streamingCount = 0;
                    var mutedCount = 0;
                    var mutedMic = 0;
                    var cameraCount = 0;
                    var connectedCount = 0;

                    const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
                    channels.forEach(c => {
                        connectedCount += c.members.size;
                        c.members.forEach(m => {
                            if (m.voice.streaming) streamingCount++;
                            if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                            if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                            if (m.voice.selfVideo) cameraCount++;
                        })
                    })
                    const voiceConnectedEmbed = new Discord.MessageEmbed()
                        .setTitle(`__${message.guild.name} ➔ Statistiques__`)
                        .setURL('https://github.com/4wip')
                        .setThumbnail(guild.iconURL({dynamic: true}))
                        .setDescription(` 
- **${message.guild.members.cache.filter(m => m.voice.channel).size}** ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Personnes*' : '*Personne*'} *en vocal.* <:vocal:1264637104026157056>
- **${mutedMic}** ${mutedMic > 1 ? '*Personnes*' : '*Personne*'} *sont mute micro.* <:4_mutemicro:1217038600039039026>
- **${mutedCount}** ${mutedCount > 1 ? '*Personnes*' : '*Personne*'} *sont mute casque.* <:4_mutecasque:1217038590744330272>
- **${streamingCount}** ${streamingCount > 1 ? '*Personnes*' : '*Personne*'} *sont en stream.* <:4_streaming:1217038609518035034>
- **${cameraCount}** ${cameraCount > 1 ? '*Personnes*' : '*Personne*'} *sont en caméra.* <:4_camera:1217038618603032596> 
`)
                        .setColor(color)
                        .setTimestamp()
                        .setFooter(`${message.guild.name} #Statistiques`)

                    return message.channel.send(voiceConnectedEmbed)
                } else if (!args[1]) {
                    let embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setTitle(`__${message.guild.name} ➔ Statistiques__`)
                        .setURL('https://github.com/4wip')
						.setThumbnail(guild.iconURL({dynamic: true}))
                        .setDescription(`- *Il y a actuellement* **${message.guild.members.cache.filter(m => m.voice.channel).size} ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? 'Personnes' : 'Personne'}** *en vocal sur le serveur.* <:vocal:1264637104026157056>`)
                        .setColor(color)
                        .setFooter(`${message.guild.name} #Statistiques`)

                    message.channel.send(embed)
                }
            }
        }
    }
}
    }
