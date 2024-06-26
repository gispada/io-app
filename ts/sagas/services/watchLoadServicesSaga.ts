import { SagaIterator } from "redux-saga";
import { fork, put, takeEvery } from "typed-redux-saga/macro";
import { getType } from "typesafe-actions";
import { BackendClient } from "../../api/backend";
import { loadServiceDetail } from "../../features/services/details/store/actions/details";
import { loadVisibleServices } from "../../store/actions/services";
import { watchServicesDetailLoadSaga } from "../startup/loadServiceDetailRequestHandler";
import { loadVisibleServicesRequestHandler } from "../startup/loadVisibleServicesHandler";
import { watchServicesDetailsSaga } from "../../features/services/details/saga";
import { handleFirstVisibleServiceLoadSaga } from "./handleFirstVisibleServiceLoadSaga";

/**
 * A saga for managing requests to load/refresh services data from backend
 * @param backendClient
 */
export function* watchLoadServicesSaga(
  backendClient: ReturnType<typeof BackendClient>
): SagaIterator {
  yield* takeEvery(
    getType(loadVisibleServices.request),
    loadVisibleServicesRequestHandler,
    backendClient.getVisibleServices
  );

  yield* fork(watchServicesDetailsSaga, backendClient);

  // start a watcher to handle the load of services details in a bunch (i.e when visible services are loaded)
  yield* fork(watchServicesDetailLoadSaga, backendClient.getService);

  // TODO: it could be implemented in a forked saga being canceled as soon as
  // isFirstServiceLoadCOmpleted is true (https://redux-saga.js.org/docs/advanced/TaskCancellation.html)
  yield* takeEvery(
    getType(loadServiceDetail.success),
    handleFirstVisibleServiceLoadSaga
  );

  // Load/refresh services content
  yield* put(loadVisibleServices.request());
}
