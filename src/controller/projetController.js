const database = require("../../database");
const ProjetManager = require("../manager/projetManager");

class ProjetController {
  async getProjects(req, res) {
    const projetManager = new ProjetManager();

    try {
      const projets = await projetManager.getAll();
      res.json(projets);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getProjectsTitleSlug(req, res) {
    const projetManager = new ProjetManager();
    try {
      const projets = await projetManager.getProjectsTitleSlug();
      res.json(projets);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getOneProject(req, res) {
    const projetManager = new ProjetManager();

    try {
      const projet = await projetManager.getOneProjectBySlug(req.params.slug);
      if (projet.length === 0) {
        res.sendStatus(404);
        return;
      }
      res.json(projet);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getOneProjectById(req, res) {
    const projetManager = new ProjetManager();

    try {
      const projet = await projetManager.getOneProjectById(req.params.id);
      if (projet.length === 0) {
        res.sendStatus(404);
        return;
      }
      res.json(projet);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async postProject(req, res) {
    const projetManager = new ProjetManager();

    const {
      title,
      subtitle,
      goals,
      duration,
      languages,
      tools,
      features,
      slug,
    } = req.body;

    try {
      const projet = await projetManager.postProject(
        title,
        subtitle,
        goals,
        duration,
        languages,
        tools,
        features,
        slug
      );
      res.status(201).json(projet);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async updateProject(req, res) {
    const projetManager = new ProjetManager();
    const id = parseInt(req.params.id);

    const {
      title,
      subtitle,
      goals,
      duration,
      languages,
      tools,
      features,
      slug,
    } = req.body;

    try {
      await projetManager.updateProject(
        id,
        title,
        subtitle,
        goals,
        duration,
        languages,
        tools,
        features,
        slug
      );
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
  async deleteProject(req, res) {
    const projetManager = new ProjetManager();
    try {
      const id = parseInt(req.params.id);
      await projetManager.deleteProject(id);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ProjetController;
