import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './Pages/HomePage';
import JobsPage from './Pages/JobsPage';
import NotFoundPage from './Pages/NotFoundPage';
import JobPage from './Pages/JobPage';
import AddJobPage from './Pages/AddJobPage';
import EditJobPage from './Pages/EditJobPage';
import jobs from '../src/jobs.json';

const App = () => {
  // Add New Job
  const addJob = (newJob) => {
    // Update jobs data directly
    jobs.push(newJob);
  };

  // Delete Job
  const deleteJob = (id) => {
    // Remove job from jobs data
    const index = jobs.findIndex(job => job.id === id);
    if (index !== -1) {
      jobs.splice(index, 1);
    }
  };

  // Update Job
  const updateJob = (updatedJob) => {
    // Update job in jobs data
    const index = jobs.findIndex(job => job.id === updatedJob.id);
    if (index !== -1) {
      jobs[index] = updatedJob;
    }
  };

  const jobLoader = ({ params }) => {
    // Fetch job data based on params.id from jobs.json
    const job = jobs.find(job => job.id === params.id);
    if (!job) throw new Error('Job not found');
    return job;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage jobs={jobs} />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} jobs={jobs} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
