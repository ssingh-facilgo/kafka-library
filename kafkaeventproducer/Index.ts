import dotenv from "dotenv";
dotenv.config();

export class ServerConfig {
  public static port = Number(process.env.PORT || '8000');
  public static bodyLimit = '128mb';
  public static corsHeaders: String[] = ['Link'];
  public static isDev: boolean = process.env.NODE_ENV === 'development';
}

export class Database {
  public static host = process.env.DATABASE_HOSTNAME;
  public static database = process.env.DATABASE_NAME;
  public static user = process.env.DATABASE_USERNAME;
  public static password = process.env.DATABASE_PASSWORD;
  public static port = Number(process.env.DATABASE_PORT);
  public static poolMin = Number(process.env.DATABASE_POOL_MIN || '0');
  public static poolMax = Number(process.env.DATABASE_POOL_MAX || '100');
  public static alias = "facilgo-db";
  public static provider = "mysql";
}

// todo Log Max Size and rotation
export class LoggerConfig {
  public static type = "winston";
}

export class Redis {
  public static url = process.env.REDIS_URL;
}

export class S3 {
  public static assetHostUrl = process.env.ASSET_HOST_URL;
}

export class ExcelBuilder {
  public static password = process.env.EXCEL_BUILDER_PASSWORD
}

export class LowesProSupplyPriceAndAvailabilityDetail {
  public static customerSupplierRef = process.env.CUSTOMER_SUPPLIER_REF
}

export class PublisherType {
  public static type = "Kafka"
}

export class QueueName {
  public static SendNotification = "-send-notification-queue"
  public static SendUsageReport = "-generate-usage-report-queue";
}

export class LowesSupportEmails {
  public static productSearchEmails: any = [process.env.PRODUCT_SEARCH_EMAILS];
  public static priceAndAvailabilityEmails: any = [process.env.PRICE_AND_AVAILABILITY_EMAILS];
}

export class ServiceName {
  public static service_name: any = "CoreService";
}

export default { Database, ServerConfig, Redis, LoggerConfig };
