import { Request, Response } from "express";
import assetService from "../services/asset.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class AssetController {
    getAllAssets = asyncHandler(
        async (req: Request,res: Response) => {
        const assets = await assetService.getAllAssets();
        return res.status(200).json(
            successResponse(assets,"Assets fetched successfully")
        );
        }
    );

    getAssetById = asyncHandler(
        async (req: Request,res: Response) => {
        const asset = await assetService.getAssetById(req.params.id as string);
        return res.status(200).json(
            successResponse(asset,"Asset fetched successfully")
        );
        }
    );

    createAsset = asyncHandler(
        async (req: Request,res: Response) => {
        const asset = await assetService.createAsset(req.body);
        return res.status(201).json(
            successResponse(asset,"Asset created successfully")
        );
        }
    );

    updateAsset = asyncHandler(
        async (req: Request,res: Response) => {
        const asset = await assetService.updateAsset(req.params.id as string,req.body);
        return res.status(200).json(
            successResponse(asset,"Asset updated successfully")
        );
        }
    );

    deleteAsset = asyncHandler(
        async (req: Request,res: Response) => {
        await assetService.deleteAsset(req.params.id as string);
        return res.status(200).json(
            successResponse(null,"Asset deleted successfully")
        );
        }
    );

    assignAsset = asyncHandler(
        async (req: Request,res: Response) => {
        const assignment = await assetService.assignAsset(req.body);
        return res.status(201).json(
            successResponse(assignment,"Asset assigned successfully")
        );
        }
    );

    returnAsset = asyncHandler(
        async (req: Request,res: Response) => {
        const assignment = await assetService.returnAsset(req.body);
        return res.status(200).json(
            successResponse(assignment,"Asset returned successfully")
        );
        }
    );

    getAssetHistory = asyncHandler(
        async (req: Request,res: Response) => {
        const history = await assetService.getAssetHistory(req.params.id as string);
        return res.status(200).json(
            successResponse(history,"Asset history fetched successfully")
        );
        }
    );
}

export default new AssetController();