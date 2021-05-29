//a job that pulls data from Indego and Open Weather APIs and dumps it to the database

import logger from 'lib-logger';
import {fetchData} from './handler';

(async () => {
  try {
    logger.info("Job Started: Fetch Data");
    await fetchData();
    logger.info("Job Completed: Fetch Data");
    process.exit(0);
  } catch (err) {
    logger.error("Job Failed: Fetch Data", err);
    process.exit(1);
  }
})();