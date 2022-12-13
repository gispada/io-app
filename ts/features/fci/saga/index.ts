import * as pot from "@pagopa/ts-commons/lib/pot";
import { SagaIterator } from "redux-saga";
import { getType } from "typesafe-actions";
import { call, takeLatest, put, select } from "typed-redux-saga/macro";
import { CommonActions } from "@react-navigation/native";
import NavigationService from "../../../navigation/NavigationService";
import { FCI_ROUTES } from "../navigation/routes";
import ROUTES from "../../../navigation/routes";
import { apiUrlPrefix } from "../../../config";
import { SessionToken } from "../../../types/SessionToken";
import { BackendFciClient } from "../api/backendFci";
import {
  fciSignatureRequestFromId,
  fciAbortRequest,
  fciStartRequest,
  fciLoadQtspClauses,
  fciLoadQtspFilledDocument
} from "../store/actions";
import {
  fciQtspClausesSelector,
  FciQtspClausesState
} from "../store/reducers/fciQtspClauses";
import { handleGetSignatureRequestById } from "./networking/handleGetSignatureRequestById";
import { handleGetQtspMetadata } from "./networking/handleGetQtspMetadata";
import { handleCreateFilledDocument } from "./networking/handleCreateFilledDocument";

/**
 * Handle the FCI Signature requests
 * @param bearerToken
 */
export function* watchFciSaga(bearerToken: SessionToken): SagaIterator {
  const fciClient = BackendFciClient(apiUrlPrefix, bearerToken);

  // handle the request of getting FCI signatureRequestDetails
  yield* takeLatest(
    getType(fciSignatureRequestFromId.request),
    handleGetSignatureRequestById,
    fciClient.getSignatureDetailViewById
  );

  // handle the request of getting QTSP metadata
  yield* takeLatest(
    getType(fciLoadQtspClauses.request),
    handleGetQtspMetadata,
    fciClient.getQtspClausesMetadata
  );

  yield* takeLatest(
    getType(fciLoadQtspFilledDocument.request),
    handleCreateFilledDocument,
    fciClient.postQtspFilledBody
  );

  yield* takeLatest(getType(fciStartRequest), watchFciStartSaga);
  yield* takeLatest(
    getType(fciLoadQtspClauses.success),
    watchFciQtspClausesSaga
  );
  yield* takeLatest(getType(fciAbortRequest), watchFciAbortSaga);
}

/**
 * Handle the FCI requests to get the QTSP filled_document
 */
function* watchFciQtspClausesSaga(): SagaIterator {
  const potQtspClauses: FciQtspClausesState = yield* select(
    fciQtspClausesSelector
  );

  if (pot.isSome(potQtspClauses)) {
    const documentUrl = potQtspClauses.value.document_url;
    yield* put(
      fciLoadQtspFilledDocument.request({ document_url: documentUrl })
    );
  }
}

/**
 * Handle the FCI abort requests
 */
function* watchFciAbortSaga(): SagaIterator {
  yield* call(
    NavigationService.dispatchNavigationAction,
    CommonActions.navigate(ROUTES.MAIN)
  );
}

/**
 * Handle the FCI start requests
 */
function* watchFciStartSaga(): SagaIterator {
  yield* call(
    NavigationService.dispatchNavigationAction,
    CommonActions.navigate(FCI_ROUTES.MAIN, {
      screen: FCI_ROUTES.DOCUMENTS
    })
  );
  // when the user start signing flow
  // start a request to get the QTSP metadata
  // this is needed to get the document_url
  // that will be used to create the filled document
  yield* put(fciLoadQtspClauses.request());
  // }
}