const database = require("../../database");
class ProjetManager {
  database;

  constructor() {
    this.database = database;
  }

  processProjet(projet) {
    projet.photos = JSON.parse(projet.photos);
    projet.faq = JSON.parse(projet.faq);
    return projet;
  }

  async getAll() {
    try {
      const [projets] = await this.database.query("SELECT * FROM projet");
      projets.map((projet) => this.processProjet(projet));

      return projets;
    } catch (err) {
      throw err;
    }
  }

  async getOneProjectBySlug(slug) {
    try {
      const [projet] = await this.database.query(
        "SELECT * FROM projet WHERE slug=?",
        [slug]
      );
      projet[0] = this.processProjet(projet[0]);
      return projet[0];
    } catch (err) {
      throw err;
    }
  }

  async getProjectsTitleSlug() {
    try {
      const [projets] = await this.database.query(
        "SELECT id, title, slug FROM projet"
      );
      projets.map((projet) => this.processProjet(projet));

      return projets;
    } catch (err) {
      throw err;
    }
  }

  async getOneProjectById(id) {
    try {
      const [projet] = await this.database.query(
        "SELECT * FROM projet WHERE id=?",
        [id]
      );
      projet[0] = this.processProjet(projet[0]);

      return projet[0];
    } catch (err) {
      throw err;
    }
  }

  async postProject(
    title,
    subtitle,
    goals,
    duration,
    languages,
    tools,
    features,
    slug
  ) {
    try {
      const [result] = await this.database.query(
        `INSERT INTO projet (title,subtitle,
            goals,
            duration,
            languages,
            tools,
            features,
            slug) VALUES (?,?,?,?,?,?,?,?)`,
        [title, subtitle, goals, duration, languages, tools, features, slug]
      );
    } catch (err) {
      throw err;
    }
  }
  async deleteProject(id) {
    try {
      const [projet] = await this.database.query(
        "DELETE FROM projet WHERE id=?",
        [id]
      );
      return projet;
    } catch (err) {
      throw err;
    }
  }

  async updateProject(
    id,
    title,
    subtitle,
    goals,
    duration,
    languages,
    tools,
    features,
    slug
  ) {
    try {
      await this.database.query(
        "UPDATE projet set title = ?,subtitle = ?, goals = ?, duration = ?, languages = ?, tools = ?, features = ?, slug = ? WHERE id = ? ",
        [title, subtitle, goals, duration, languages, tools, features, slug, id]
      );
      return;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = ProjetManager;
