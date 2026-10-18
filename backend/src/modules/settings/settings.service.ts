import { prisma } from '../../config/prisma.config';
import { UpdateSettingsDto } from './settings.validation';

export class SettingsService {
  static async getSettings(): Promise<any> {
    let settings = await prisma.settings.findFirst();

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          siteName: 'خمسة برمجة بالبلدي',
          tagline: 'افهمها بالبلدي.. اكتبها بالكود.',
          siteDescription: 'منصة لتبسيط البرمجة وعلوم الحاسب باللغة العربية البسيطة',
        },
      });
    }

    return settings;
  }

  static async updateSettings(data: UpdateSettingsDto): Promise<any> {
    let settings = await prisma.settings.findFirst();

    const updatePayload: any = {};
    if (data.siteName !== undefined) updatePayload.siteName = data.siteName;
    if (data.tagline !== undefined) updatePayload.tagline = data.tagline;
    if (data.siteDescription !== undefined) updatePayload.siteDescription = data.siteDescription;
    if (data.language !== undefined) updatePayload.language = data.language;
    if (data.direction !== undefined) updatePayload.direction = data.direction;
    if (data.timezone !== undefined) updatePayload.timezone = data.timezone;
    if (data.logo !== undefined) updatePayload.logo = data.logo;
    if (data.favicon !== undefined) updatePayload.favicon = data.favicon;

    if (settings) {
      if (data.socialLinks) {
        updatePayload.socialLinks = { ...((settings.socialLinks as object) || {}), ...data.socialLinks };
      }
      if (data.contact) {
        updatePayload.contact = { ...((settings.contact as object) || {}), ...data.contact };
      }
      if (data.defaultSeo) {
        updatePayload.defaultSeo = { ...((settings.defaultSeo as object) || {}), ...data.defaultSeo };
      }
      if (data.homepage) {
        updatePayload.homepage = { ...((settings.homepage as object) || {}), ...data.homepage };
      }
      if (data.hero) {
        updatePayload.hero = { ...((settings.hero as object) || {}), ...data.hero };
      }
      if (data.about) {
        updatePayload.about = { ...((settings.about as object) || {}), ...data.about };
      }
      if (data.founder) {
        updatePayload.founder = { ...((settings.founder as object) || {}), ...data.founder };
      }
      if (data.footer) {
        updatePayload.footer = { ...((settings.footer as object) || {}), ...data.footer };
      }

      const updated = await prisma.settings.update({
        where: { id: settings.id },
        data: updatePayload,
      });
      return updated;
    } else {
      const created = await prisma.settings.create({
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
