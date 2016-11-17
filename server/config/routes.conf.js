import HousesRoutes from '../api/house';
import RoomsRoutes from '../api/room';

export function initRoutes (app) {
  const startTime = new Date();

  // Insert routes below
  app.use('/api/houses', HousesRoutes);
  app.use('/api/rooms', RoomsRoutes);

  app.route('/*')
    .get((req, res) => {
        const uptime = `${new Date() - startTime}ms`;
        res.status(200).json({ startTime, uptime });
      }
    );

}
