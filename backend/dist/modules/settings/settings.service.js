"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const prisma_config_1 = require("../../config/prisma.config");
class SettingsService {
    static async getSettings() {
        let settings = await prisma_config_1.prisma.settings.findFirst();
        if (!settings) {
            settings = await prisma_config_1.prisma.settings.create({
                data: {
                    siteName: 'خمسة برمجة بالبلدي',
                    tagline: 'افهمها بالبلدي.. اكتبها بالكود.',
                    siteDescription: 'منصة لتبسيط البرمجة وعلوم الحاسب باللغة العربية البسيطة',
                },
            });
        }
        return settings;
    }
    static async updateSettings(data) {
        let settings = await prisma_config_1.prisma.settings.findFirst();
        const updatePayload = {};
        if (data.siteName !== undefined)
            updatePayload.siteName = data.siteName;
        if (data.tagline !== undefined)
            updatePayload.tagline = data.tagline;
        if (data.siteDescription !== undefined)
            updatePayload.siteDescription = data.siteDescription;
        if (data.language !== undefined)
            updatePayload.language = data.language;
        if (data.direction !== undefined)
            updatePayload.direction = data.direction;
        if (data.timezone !== undefined)
            updatePayload.timezone = data.timezone;
        if (data.logo !== undefined)
            updatePayload.logo = data.logo;
        if (data.favicon !== undefined)
            updatePayload.favicon = data.favicon;
        if (settings) {
            if (data.socialLinks) {
                updatePayload.socialLinks = { ...(settings.socialLinks || {}), ...data.socialLinks };
            }
            if (data.contact) {
                updatePayload.contact = { ...(settings.contact || {}), ...data.contact };
            }
            if (data.defaultSeo) {
                updatePayload.defaultSeo = { ...(settings.defaultSeo || {}), ...data.defaultSeo };
            }
            if (data.homepage) {
                updatePayload.homepage = { ...(settings.homepage || {}), ...data.homepage };
            }
            if (data.hero) {
                updatePayload.hero = { ...(settings.hero || {}), ...data.hero };
            }
            if (data.about) {
                updatePayload.about = { ...(settings.about || {}), ...data.about };
            }
            if (data.founder) {
                updatePayload.founder = { ...(settings.founder || {}), ...data.founder };
            }
            if (data.footer) {
                updatePayload.footer = { ...(settings.footer || {}), ...data.footer };
            }
            const updated = await prisma_config_1.prisma.settings.update({
                where: { id: settings.id },
                data: updatePayload,
            });
            return updated;
        }
        else {
            const created = await prisma_config_1.prisma.settings.create({
                data: {
                    siteName: data.siteName || 'خمسة برمجة بالبلدي',
                    tagline: data.tagline || 'افهمها بالبلدي.. اكتبها بالكود.',
                    siteDescription: data.siteDescription || 'منصة لتبسيط البرمجة',
                    ...updatePayload,
                },
            });
            return created;
        }
    }
}
exports.SettingsService = SettingsService;
