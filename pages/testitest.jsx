import {
  fetchModel,
  ResponsiveGrid,
} from '@adobe/aem-react-editable-components';
import Layout from '../components/layout';
import { getBasicAuth } from '../lib/getAuth';
import getPages from '../lib/getPages';

const { NEXT_PUBLIC_AEM_HOST, NEXT_PUBLIC_AEM_ROOT } = process.env;
export default function ({ model, pagePath, pages }) {
  return (
    <Layout pages={pages}>
      <section>
        <div className="px-2 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-2 lg:py-6">
          <h1 className="text-3xl">hai</h1>
          <ResponsiveGrid
            key={pagePath}
            model={model}
            pagePath={pagePath}
            itemPath="root/responsivegrid"
          />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const pagePath = `/content/wknd-app/us/en/${
    context.query.page?.join('/') || 'home'
  }`;

  const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);
  const model = await fetchModel({
    pagePath,
    itemPath: 'root/responsivegrid',
    host: NEXT_PUBLIC_AEM_HOST,
    options: {
      headers: {
        Authorization: `Basic ${getBasicAuth()}`,
      },
    },
  });
  return {
    props: {
      model,
      pagePath,
      pages,
    },
  };
}
